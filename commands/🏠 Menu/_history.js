/*CMD
  command: /history
  help:
  need_reply: false
  auto_retry_time:
  folder: 🏠 Menu
  answer:
  keyboard:
  aliases:
  group:
CMD*/

// Retrieve user-specific withdrawal history
const history = Bot.getProp("withdraw_history-" + user.telegramid, []);

// If no history, alert user
if (!history.length) {
  return smartBot.run({ command: "history:noData" });
}

// Limit to the most recent 10 entries
const latestWithdrawals = history.slice(0, 10);

// Format each withdrawal entry
const withdrawalsText = latestWithdrawals.map((item, index) => {
  const withdrawalTime = new Date(parseInt(item.id.replace("wd_", "")));
  const formattedTime = withdrawalTime.toLocaleString();

  const status = item.status === "pending" ? "🔄 Pending" : item.status === "approved" ? "✅ Approved" : "❌ Rejected";

  smartBot.add({
    index: index + 1,
    time: formattedTime,
    amount: item.amount,
    status: status
  });

  return smartBot.fill(smartBot.params.withdrawalTemplate)
}).join("");

// Save final values to use in a message template
smartBot.add({
  count: latestWithdrawals.length,
  withdrawals: withdrawalsText
});

