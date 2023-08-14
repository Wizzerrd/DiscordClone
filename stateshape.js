{
    entities: {

        users: {
            currentUser: UserObject,
            userObjectId: UserObject
        },

        memberships: {
            memebershipId: MembershipObject
        },

        relationships: {
            relationshipId: RelationshipObject
        },

        servers: {
            serverId: ServerObject
        }

        channels: {
            channelId: ChannelObject
        },

        buckets: {
            bucketId: BucketObject
        },

        messages: {
            messageId: MessageObject
        }
    },

    ui: {
        modal: [false, 'userSettings', 'serverSettings', 'channelSettings', 'findConversation'],
        loading: [true/false],
        centerPanel: ['friends', 'channel'],
        leftPanelChannelList: [true/false],
        rightPanel: [true/false],
    },

    session: {
        sessionToken: 'string',
        user: userId
    },

    errors: {
        login: ["Login or password is invalid."],
        createUser: ["Username can't be blank"],
        createServer: ["Server name can't be blank"]
    }
}