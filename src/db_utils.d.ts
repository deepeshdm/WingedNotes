
import { DocumentData } from 'firebase/firestore';

type Post = {
  id: string;
  title: string;
  body: string;
  createdOn: string;
  lastUpdated: string;
}

export declare function getUserPosts(username: string): Post[] | null
export declare function userExists(username: string): boolean
export declare function isPasswordCorrect(username: string, password: string): boolean
export declare function registerUser(firstname: string|undefined, lastname: string|undefined, username: string|undefined, socialLink: string|undefined, password: string|undefined): boolean
export declare function deleteUserAccount(username: string): boolean
export declare function createPost(username: string, post: { title: string; body: string; createdOn: string; lastUpdated: string; }): string | null
export declare function getPostbyId(username: string, postId: string): DocumentData
export declare function updatePost(username: string, postId: string, updatedPost: { title: string; body: string; }): boolean
export declare function deleteNote(username: string, postId: string): boolean
export declare function deleteAllNotes(username: string): boolean
export declare function changeUserPassword(username: string, newPassword: string): boolean
export declare function getUserDocument(username: string)
export declare function updateUserFields(username: string, fieldsToUpdate: { Firstname: string; Lastname: string; Username: string; socialMediaLink: string }): boolean

