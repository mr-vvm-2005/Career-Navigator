import { db } from "../firebase/config";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot 
} from "firebase/firestore";

/**
 * Get user data from Firestore
 * @param {string} userId - User ID
 */
export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User document does not exist");
    }
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

/**
 * Save resume data and analysis to Firestore
 * @param {string} userId - User ID
 * @param {Object} data - Resume analysis data
 */
export const saveResumeAnalysis = async (userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      resumeData: {
        resumeText: data.resumeText || "",
        atsScore: data.atsScore || 0,
        lastUpdated: new Date().toISOString()
      },
      userStats: {
        atsScore: data.atsScore || 0,
        ...data.stats
      }
    });
  } catch (error) {
    console.error("Error saving resume analysis", error);
    throw error;
  }
};

/**
 * Update user progress (practice, roadmap, skill data)
 * @param {string} userId - User ID
 * @param {Object} data - Updated data
 */
export const updateProgress = async (userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, data);
  } catch (error) {
    console.error("Error updating progress", error);
    throw error;
  }
};

/**
 * Real-time listener for user data
 * @param {string} userId - User ID
 * @param {Function} callback - Callback function
 */
export const subscribeToUserData = (userId, callback) => {
  const userRef = doc(db, "users", userId);
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  });
};
