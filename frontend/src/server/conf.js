import axios from 'axios';

export class Service {
    constructor() {
        this.apiClient = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',  // Use environment variable for base URL
        });

        // Interceptor to attach JWT token to every request
        this.apiClient.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    // Create Post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('slug', slug);
            formData.append('content', content);
            formData.append('isPublished', status);
            formData.append('userID', userId);
            if (featuredImage) {
                formData.append('featuredImage', featuredImage);  // Assuming it's a file
            }

            const response = await this.apiClient.post('/create-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create post');
        }
    }

    // Update Post
    async updatePost(slug, { title, content, featuredImage, status, postId, userId }) {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('slug', slug);
            formData.append('content', content);
            formData.append('isPublished', status);
            formData.append('userID', userId);
            formData.append('postId', postId);
            if (featuredImage) {
                formData.append('featuredImage', featuredImage);
            }

            const response = await this.apiClient.patch('/update-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update post');
        }
    }

    // Delete Post
    async deletePost(slug, userId) {
        try {
            const response = await this.apiClient.post('/delete-post', { slug, userID: userId });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete post');
        }
    }

    // Get a Single Post by Slug
    async getPost(slug) {
        try {
            const response = await this.apiClient.get(`/c/${slug}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to retrieve post');
        }
    }

    // Get All Posts
    async getAllPosts() {
        try {
            const response = await this.apiClient.get('/all-posts');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to retrieve posts');
        }
    }
}

const service = new Service();
export default service;
