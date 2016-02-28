const API_URL = 'http://api.stackable.space/v1';

StackableApi = class StackableApi {
    static getContainers(token) {
        return `${API_URL}/containers?token=${token}`;
    }

    static getContainerItems(token, containerId) {
        return `${API_URL}/containers/${containerId}/items?token=${token}`;
    }

    static getItem(token, itemId) {
        return `${API_URL}/items/${itemId}?token=${token}`;

    }
};
