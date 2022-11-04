import { Injectable } from "@angular/core";
import { deleteObject, FullMetadata, getDownloadURL, getMetadata, list, listAll, ListResult, percentage, ref, SettableMetadata, Storage, StorageReference, updateMetadata, uploadBytes, uploadBytesResumable, UploadMetadata, UploadResult, UploadTask, UploadTaskSnapshot } from "@angular/fire/storage";
import { Observable } from 'rxjs';
@Injectable()
export class StorageService {
  constructor(private storage: Storage) { }

  // Get all files
  public getFilesList(path: string): Promise<ListResult> {
    const reference: StorageReference = ref(this.storage, path);
    return listAll(reference);
  }

  // Get all files with pagination
  public getFilesListWithPagination(path: string, pageToken: string | null, maxResults: number = 10): Promise<ListResult> {
    const reference: StorageReference = ref(this.storage, path);
    return list(reference, { pageToken, maxResults });
  }

  // Get file metadata
  public getFileMetaData(path: string): Promise<FullMetadata> {
    const reference: StorageReference = ref(this.storage, path);
    return getMetadata(reference);
  }

  // Update file metadata
  public updateFileMetaData(path: string, metadata: SettableMetadata): Promise<FullMetadata> {
    const reference: StorageReference = ref(this.storage, path);
    return updateMetadata(reference, metadata);
  }

  // Get download link of a file
  public getFileDownloadUrl(path: string): Promise<string> {
    const reference: StorageReference = ref(this.storage, path);
    return getDownloadURL(reference);
  }

  // Upload a file
  public uploadFile(file: File, path: string, metadata: UploadMetadata): Promise<UploadResult> {
    const reference: StorageReference = ref(this.storage, path);
    return uploadBytes(reference, file, metadata);
  }

  // Handle a file upload
  public uploadFileWithControl(file: File, path: string, metadata: UploadMetadata): UploadTask {
    const reference: StorageReference = ref(this.storage, path);
    return uploadBytesResumable(reference, file, metadata);
  }

  // Get status of an upload
  public getUploadPercentageValue(task: UploadTask): Observable<{ progress: number; snapshot: UploadTaskSnapshot }> {
    return percentage(task);
  }

  // Delete a file
  public deleteFile(path: string): Promise<void> {
    const reference: StorageReference = ref(this.storage, path);
    return deleteObject(reference);
  }
}