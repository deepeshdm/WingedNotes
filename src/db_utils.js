
// Utility functions to interact with Firestore 

import { db } from '../firebase-config'
import format from 'date-fns/format';
import { doc, collection, setDoc, getDoc, addDoc, getDocs, deleteDoc, updateDoc, writeBatch } from "firebase/firestore";
const crypto = require('crypto');

// Checks if username already exists returns true/false
export async function userExists(username) {
    const location = doc(db, "Registered_Users/", username);
    const userDoc = await getDoc(location);
    return userDoc.exists();
}

// Verify passwords for given username
export async function isPasswordCorrect(username, password) {
    const location = doc(db, "Registered_Users/", username);
    const userDoc = await getDoc(location);
    // if username already exists verify passwords else return false.
    if (userDoc.exists()) {
        // return true if passwords match else false
        const userData = userDoc.data();
        console.log("User exists !")
        return password === userData.Password
    } else {
        console.log("User does'nt exist !")
        return false;
    }
}



const samplePosts = [
    {
        title: "Confessions of a Notepad",
        body: "Sometimes I wonder if my users are actually using me to take notes, or just to procrastinate. Either way, I'm here for you."
    },
    {
        title: "My Secret Life as a Notepad",
        body: "When I'm not busy storing your notes, I like to imagine what kind of notes you're taking. Are they deep and philosophical, or just a shopping list?"
    },
    {
        title: "The Adventures of Notepad and Pen",
        body: "Sometimes I like to pretend that I'm a superhero, saving your notes from the perils of forgetfulness. And Pen is my trusty sidekick."
    }
]


// Creates a new user in firestore
export async function registerUser(firstname, lastname, username, socialLink, password) {

    // Generate hash value for password
    const HashPassword = crypto.createHash('sha256').update(password).digest('hex');

    const newUser = {
        Firstname: firstname,
        Lastname: lastname,
        socialMediaLink: socialLink,
        Username: username,
        Password: HashPassword,
        RegisteredOn: new Date()
    }


    // Path reference for the "Registered_Users/{username}" document
    const location = doc(db, "Registered_Users", username);

    // Path for the "Registered_Users/{username}/AllPosts" collection
    const allPostsRef = collection(location, "AllPosts");

    const currentDate = String(format(new Date(), 'MMM dd, h:mm aa, yyyy'))

    try {
        // Insert userinfo 
        await setDoc(location, newUser);

        // Insert sample posts
        samplePosts.forEach(post => {
            // Add the creation timing to post
            const newPost = { ...post, createdOn: currentDate, lastUpdated: currentDate }
            // DocumentID is automatically generated
            addDoc(allPostsRef, newPost)
        })

        console.log("User Account Registered !")
        return true;
    } catch (error) {
        const errorMessage = error.message;
        console.log("Insert Error : ", errorMessage);
        return false;
    }

}


// Deletes an existing user account
export async function deleteUserAccount(username) {

    // Path reference for the "Registered_Users" collection
    const location = collection(db, "Registered_Users");

    // Path for the "Registered_Users/{username}" document
    const userRef = doc(location, username);

    try {
        // Delete the user account document
        await deleteDoc(userRef);

        console.log("User account deleted successfully");

        // Return true to indicate success
        return true;
    } catch (error) {
        console.error("Error deleting user account:", error);
        return false;
    }
}


// Fetches all posts from the given user,returns array.
export async function getUserPosts(username) {
    // Path reference for the "Registered_Users/{username}" document
    const location = doc(db, "Registered_Users", username);

    // Path for the "Registered_Users/{username}/AllPosts" collection
    const allPostsRef = collection(location, "AllPosts");

    try {
        // Query all documents in the "AllPosts" collection
        const querySnapshot = await getDocs(allPostsRef);

        // Return an array of post objects
        return querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
    } catch (error) {
        console.error("Error getting posts:", error);
        return null;
    }
}


// Creates a new post for the given user
export async function createPost(username, post) {

    // Path reference for the "Registered_Users/{username}" document
    const location = doc(db, "Registered_Users", username);
    // Path for the "Registered_Users/{username}/AllPosts" collection
    const allPostsRef = collection(location, "AllPosts");

    try {
        // Add the new post to the "AllPosts" collection
        const docRef = await addDoc(allPostsRef, post);

        console.log("New post created with ID:", docRef.id);

        // Return the ID of the newly created post
        return docRef.id;
    } catch (error) {
        console.error("Error creating post:", error);
        return null;
    }
}

// Get the post with given ID and username
export async function getPostbyId(username, postId) {
    const postRef = doc(db, "Registered_Users", username, "AllPosts", postId);
    const postDoc = await getDoc(postRef);
    return postDoc;
}


// Updates an existing post for the given user
export async function updatePost(username, postId, updatedPost) {
    // Path reference for the "Registered_Users/{username}" document
    const location = doc(db, "Registered_Users", username);

    // Path for the "Registered_Users/{username}/AllPosts/{postId}" document
    const postRef = doc(collection(location, "AllPosts"), postId);

    try {
        // Update the existing post document
        await updateDoc(postRef, updatedPost);

        console.log("Post updated successfully");

        // Return true to indicate success
        return true;
    } catch (error) {
        console.error("Error updating post:", error);
        return false;
    }
}


// Deletes an existing post for the given user
export async function deleteNote(username, postId) {

    // Path reference for the "Registered_Users/{username}" document
    const location = doc(db, "Registered_Users", username);

    // Path for the "Registered_Users/{username}/AllPosts/{postId}" document
    const postRef = doc(collection(location, "AllPosts"), postId);

    try {
        // Delete the existing post document
        await deleteDoc(postRef);

        console.log("Post deleted successfully");

        // Return true to indicate success
        return true;
    } catch (error) {
        console.error("Error deleting post:", error);
        return false;
    }
}


// Deletes all posts for a given username
export async function deleteAllNotes(username) {
    try {
        const userRef = doc(db, "Registered_Users", username);
        const allPostsRef = collection(userRef, "AllPosts");

        const querySnapshot = await getDocs(allPostsRef);
        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log("All posts deleted successfully");

        return true;
    } catch (error) {
        console.error("Error deleting AllPosts collection!", error);
        return false;
    }
}



// Changes the password for an existing user
export async function changeUserPassword(username, newPassword) {

    // Path for the "Registered_Users/{username}" document
    const userRef = doc(db, "Registered_Users", username);

    try {

        // Update the user account document with the new password
        await updateDoc(userRef, { Password: newPassword })
        console.log("Password changed successfully");
        return true;

    } catch (error) {
        console.error("Error changing password:", error);
        return false;
    }
}


// Fetches the document of the given user
export async function getUserDocument(username) {

    // Path for the "Registered_Users/{username}" document
    const userRef = doc(db, "Registered_Users", username);

    try {
        // Get the document of the user
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc;
        } else {
            console.error("User not found");
            return null;
        }
    } catch (error) {
        console.error("Error getting user document:", error);
        return null;
    }
}


// Updates given fields for a registered user
export async function updateUserFields(username, fieldsToUpdate) {

    // Eg - fieldsToUpdate = { Firstname: "John", Lastname: "Doe" };

    const userRef = doc(db, "Registered_Users", username);

    try {
        await updateDoc(userRef, fieldsToUpdate);
        console.log("User fields updated successfully");
        return true;
    } catch (error) {
        console.error("Error updating user fields:", error);
        return false;
    }
}


