async function sendSMS(recipient, message) {
  console.log(`Sending SMS to ${recipient}: ${message}`);

  // Simulate a delivery delay
  await new Promise((r) => {
    setTimeout(r, 500);
  });

  // Randomly fail sometimes
  const success = Math.random() > 0.1;

  if (!success) {
    console.error(`Failed to send SMS to ${recipient}`);
    return { success: false, error: 'Simulated failure' };
  }

  console.log(`Sent SMS successfully to ${recipient}`);
  return { success: true };
}

sendSMS('0701234567', 'Welcome to remindr!');
