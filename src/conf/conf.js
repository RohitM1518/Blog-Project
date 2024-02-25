const  conf={
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMCEApiKey: String(import.meta.env.VITE_TINY_MCE_TEXT_EDITOR_API)
}
export default conf;

// Environmet variable should always be used as String