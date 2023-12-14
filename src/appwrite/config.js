import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client;
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, image, status , userid}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userid
                }

            )
        } catch (error) {
            console.log("There is an error in the appwrite servive", error)
        }
    }

    async updatePost(slug,{title,  content, image, status }){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.log("Error in the Appwrite services: ", error)
        }
    }
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Error in the appwrite service", error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error in appwrite service ", error)
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Error in appwrite service ", error)
        }
    }
    //File upload services are down below
    async fileUpload(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error in appwrite service ", error)
            return false;
        }
    }
    async deleteFile(fileid){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileid
            )
            return true;
        } catch (error) {
            console.log("Error in appwrite service ", error)
            return false;
        }
    }
}


const service = new Service;

export default service;