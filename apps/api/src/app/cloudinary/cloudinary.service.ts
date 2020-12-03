import { CloudinaryConfig, CloudinaryImageUploadResponse } from "./interfaces";
import { environment } from "../../environments/environment";
import { Injectable } from "@nestjs/common";

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config(this.config());
    }

    private config(): CloudinaryConfig {
        return environment.cloudinaryConfig;
    }

    async upload(filename: string, options?) {
        return await cloudinary.uploader.upload(filename, options);
    }

    async upload_stream(file, options = {}): Promise<CloudinaryImageUploadResponse> {
        return new Promise((resolve, reject) => {

            let cld_upload_stream = cloudinary.uploader.upload_stream(
                options,
                (error: any, result: any) => {

                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );

            streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
        });
    }

    async destroy(public_id, options = {}) {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(public_id, options, (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        })
    }
}