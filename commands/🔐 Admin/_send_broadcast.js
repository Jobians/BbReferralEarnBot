/*CMD
  command: /send_broadcast
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🔐 Admin
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Exit early if required options are not available
if (!options) return;

// Copy the broadcast message from the source chat to the current user's private chat
Api.copyMessage({
  from_chat_id: options.chat_id,
  message_id: options.message_id
});
