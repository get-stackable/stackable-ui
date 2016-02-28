//todo move keys to settings
const s3Key = 'AKIAJNPXT3DN22QSVOVQ';
const s3Secret = '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';
const s3Bucket = 'stackable';
const s3Region = 'us-west-2';

Slingshot.createDirective("imageUploads", Slingshot.S3Storage, {
    bucket: s3Bucket,
    acl: "public-read",
    region: s3Region,
    AWSAccessKeyId: s3Key,
    AWSSecretAccessKey: s3Secret,
    authorize: function (file, metaContext) {
        //Deny uploads if user is not logged in.
        if (!this.userId) {
            var message = "Please login before posting files";
            throw new Meteor.Error("Login Required", message);
        }

        return true;
    },
    key: function (file, metaContext) {
        //Store file into a directory by the user's id.
        return "images/" + this.userId + "/" + Date.now() + "-" + file.name;
    }
});