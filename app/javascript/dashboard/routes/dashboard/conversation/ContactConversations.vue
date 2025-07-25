<script>
import ConversationCard from 'dashboard/components/widgets/conversation/ConversationCard.vue';
import { mapGetters } from 'vuex';
import Spinner from 'dashboard/components-next/spinner/Spinner.vue';

export default {
  components: {
    ConversationCard,
    Spinner,
  },
  props: {
    contactId: {
      type: [String, Number],
      required: true,
    },
    conversationId: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    conversations() {
      return this.$store.getters['contactConversations/getContactConversation'](
        this.contactId
      );
    },
    previousConversations() {
      return this.conversations.filter(
        conversation => conversation.id !== Number(this.conversationId)
      );
    },
    ...mapGetters({
      uiFlags: 'contactConversations/getUIFlags',
    }),
  },
  watch: {
    contactId(newContactId, prevContactId) {
      if (newContactId && newContactId !== prevContactId) {
        this.$store.dispatch('contactConversations/get', newContactId);
      }
    },
  },
  mounted() {
    this.$store.dispatch('contactConversations/get', this.contactId);
  },
};
</script>

<template>
  <div v-if="!uiFlags.isFetching" class="">
    <div v-if="!previousConversations.length" class="no-label-message px-4 p-3">
      <span>
        {{ $t('CONTACT_PANEL.CONVERSATIONS.NO_RECORDS_FOUND') }}
      </span>
    </div>
    <div v-else class="contact-conversation--list">
      <ConversationCard
        v-for="conversation in previousConversations"
        :key="conversation.id"
        :chat="conversation"
        :hide-inbox-name="false"
        hide-thumbnail
        class="compact"
      />
    </div>
  </div>
  <div v-else class="flex items-center justify-center py-5">
    <Spinner />
  </div>
</template>

<style lang="scss" scoped>
.no-label-message {
  @apply text-n-slate-11 mb-4;
}

::v-deep .conversation {
  @apply pr-0;

  .conversation--details {
    @apply pl-2;
  }
}
</style>
