// Add Google configuration entry
ServiceConfiguration.configurations.update(
    { "service": "google" },
    {
        $set: {
            clientId: "756107135549-bfh5p423kg1daofc8d400aa1ihej0cof.apps.googleusercontent.com",
            secret: "pB7gY_2nc94FBwT9X-ekRaui"
        }
    },
    { upsert: true }
);
