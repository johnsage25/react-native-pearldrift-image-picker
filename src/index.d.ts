export interface ImagePickerOption {
  imageCount: number, // The maximum number of selected images, the default is 6
  isRecordSelected: boolean, // Whether the picture is selected
  isCamera: boolean, // Whether to allow users to take pictures inside, the default is true
  isCrop: boolean, // Whether to allow cropping, the default is false, and the imageCount is 1 to take effect
  CropW: number, // Crop width, default screen width 60%
  CropH: number, // Crop height, default screen width 60%
  isGif: boolean, // Whether to allow selection of GIF, the default is false, there is no callback GIF data
  showCropCircle: boolean, // Whether to show the circular cropping area, the default is false
  circleCropRadius: number, // Circular cropping radius, half the screen width by default
  showCropFrame: boolean, // Whether to show the cropped area, the default is true
  showCropGrid: boolean, // whether to hide the crop area grid, the default is false
  freeStyleCropEnabled: boolean, // Whether the crop box can be dragged
  rotateEnabled: boolean, // Whether the crop can rotate the picture
  scaleEnabled: boolean, // Whether cropping can zoom in or zoom out the image
  compress: boolean,
  compressFocusAlpha:boolean, //compress png to retain transparency
  minimumCompressSize: number, // Pictures less than 100kb are not compressed
  quality: number, // compression quality
  enableBase64: boolean, // Whether to return base64 encoding, not return by default
  allowPickingOriginalPhoto: boolean,
  allowPickingMultipleVideo: boolean, // You can select multiple videos/gifs/pictures, and share the limit of the maximum number of optional pictures maxImagesCount with photos
  videoMaximumDuration: number, // The maximum video recording time, the default is 10 minutes, the unit is seconds
  isWeChatStyle: boolean, // Whether it is the WeChat style selection interface Android Only
  isLightStyle:boolean,
  isQQStyle:boolean,
  isSinaStyle:boolean,
  circleDimmedLayer:boolean,
  sortAscendingByModificationDate: boolean // Sort photos in ascending order by modification time, the default is YES. If set to NO, the latest photo will be displayed at the front, and the internal photo button will be the first
  videoCount: number // number of videos
  MaxSecond: number // Select the maximum duration of the video, the default is 180 seconds
  MinSecond: number // Select the minimum length of the video, the default is 1 second
  showSelectedIndex: boolean, // Whether to display the serial number, not displayed by default
}

interface SelectedPhoto {
  width: number, //image width
  height: number, //image height
  uri: string, //image path
  original_uri:string, //Original path of image, only Android
  type: string, //File type, only Android, currently only returns image
  size:number, //image size, in bytes b
  base64:string //The base64 encoding of the picture, if enableBase64 is set to false, this property will not be returned
}

/**
 * Called in the form of Callback
 * 1. The album parameters temporarily only support the properties listed in the default parameters;
 * 2. Callback form: showImagePicker(options, (err, selectedPhotos) => {})
 * 1) The selected picture is successful, err is null, and selectedPhotos is the selected picture array
 * 2) When canceled, err returns "Cancel" and selectedPhotos will be undefined
 * Judge the value of each parameter as needed to ensure that the call is normal. Example usage:
 * showImagePicker(options, (err, selectedPhotos) => {
 * if (err) {
 *              // cancel selection
 * return;
 * }
 * // successful selection
 * })
 *
 * @param {Object} options Album parameters
 * @param {Function} callback success, or failure callback
 */
export function showImagePicker (options:Partial<ImagePickerOption>,callback:(err:null|string,photos:Array<SelectedPhoto>)=>void): void;


/**
 * Called as Promise
 * 1. The album parameters temporarily only support the properties listed in the default parameters;
 * 2. How to use
 * 1) async/await
 * handleSelectPhoto = async() => {
 * try {
 * const photos = await SYImagePicker.asyncShowImagePicker(options);
 * // successful selection
 * } catch (err) {
 * // Cancel selection, err.message is "cancel"
 * }
 * }
 *2) promise.then form
 * handleSelectPhoto = () => {
 * SYImagePicker.asyncShowImagePicker(options)
 * .then(photos => {
 * // successful selection
 * })
 * .catch(err => {
 * // Cancel selection, err.message is "cancel"
 * })
 * }
 * @param {Object} options Album parameters
 * @return {Promise} returns a Promise object
 */
export function asyncShowImagePicker (options:Partial<ImagePickerOption>): Promise<Array<SelectedPhoto>>;

/**
 * Open camera to support cropping parameters
 * @param options
 * @param callback
 */
export function openCamera (options:Partial<ImagePickerOption>,callback:(err:null|string,photos:Array<SelectedPhoto>)=>void): void;


export function asyncOpenCamera (options:Partial<ImagePickerOption>): Promise<Array<SelectedPhoto>>;

/**
 * clear cache
 */
export function deleteCache (): void;

/**
 * remove selected image
 * @param {Number} index The index of the image to remove
 */
export function removePhotoAtIndex (index:number): void;

/**
 * remove all selected images
 */
export function removeAllPhoto (): void;

export function openVideoPicker (options:Partial<ImagePickerOption>,callback:(err:null|string,photos:Array<SelectedPhoto>)=>void): void;