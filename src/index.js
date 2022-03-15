import {
    NativeModules,
    Dimensions,
} from 'react-native';

const { RNPearlImagePicker } = NativeModules;

const { width } = Dimensions.get('window');
/**
 * default parameters
 */
const defaultOptions = {
    imageCount: 6, // The maximum number of selected images, the default is 6
    isRecordSelected: false, // Whether the picture has been selected
    isCamera: true, // Whether to allow users to take pictures inside, the default is true
    isCrop: false, // Whether to allow cropping, the default is false, and the imageCount is 1 to take effect
    CropW: ~~(width * 0.6), // Crop width, default screen width 60%
    CropH: ~~(width * 0.6), // Crop height, default screen width 60%
    isGif: false, // Whether to allow selection of GIF, the default is false, there is no callback GIF data
    showCropCircle: false, // Whether to show the circular cropping area, the default is false
    circleCropRadius: ~~(width / 4), // Circular cropping radius, the default screen width is half
    showCropFrame: true, // Whether to show the cropping area, the default is true
    showCropGrid: false, // Whether to hide the crop area grid, the default is false
    freeStyleCropEnabled: false, // Whether the crop box can be dragged
    rotateEnabled: true, // Whether the crop can rotate the picture
    scaleEnabled: true, // Whether cropping can zoom in or zoom out the image
    compress: true,
    compressFocusAlpha:false, //compress png to retain transparency
    minimumCompressSize: 100, // Pictures less than 100kb are not compressed
    quality: 90, // compression quality
    enableBase64: false, // Whether to return base64 encoding, not return by default
    allowPickingOriginalPhoto: false,
    allowPickingMultipleVideo: false, // You can select multiple videos/gifs/pictures, and share the limit of the maximum number of optional pictures maxImagesCount with photos
    videoMaximumDuration: 10 * 60, // The maximum video recording time, the default is 10 minutes, the unit is seconds
    isWeChatStyle: false, // Whether it is the WeChat style selection interface Android Only
    isLightStyle:false,
    isQQStyle:false,
    circleDimmedLayer:false,
    isSinaStyle:false,
    sortAscendingByModificationDate: true, // Sort photos in ascending order by modification time, the default is YES. If set to NO, the latest photo will be displayed at the front, and the internal photo button will be the first
    showSelectedIndex: false, // Whether to display the serial number, it is not displayed by default
};

export default {
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
    showImagePicker(options, callback) {
        const optionObj = {
            ...defaultOptions,
            ...options
        };
        RNPearlImagePicker.showImagePicker(optionObj, callback)
    },

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
    asyncShowImagePicker(options) {
        const optionObj = {
            ...defaultOptions,
            ...options,
        };
        return RNPearlImagePicker.asyncShowImagePicker(optionObj);
    },

    /**
     * Turn on camera support for cropping parameters
     * @param options
     * @param callback
     */
    openCamera(options, callback) {
        const optionObj = {
            ...defaultOptions,
            ...options
        };
        RNPearlImagePicker.openCamera(optionObj, callback)
    },

    asyncOpenCamera(options) {
        const optionObj = {
            ...defaultOptions,
            ...options,
        };
        return RNPearlImagePicker.asyncOpenCamera(optionObj);
    },

    /**
     * delete
     */
    deleteCache() {
        RNPearlImagePicker.deleteCache()
    },

    /**
     * Remove photo with index number
     * @param {Number} index image subscript to remove
     */
    removePhotoAtIndex(index) {
        RNPearlImagePicker.removePhotoAtIndex(index)
    },

    /**
     * remove all selected images
     */
    removeAllPhoto() {
        RNPearlImagePicker.removeAllPhoto()
    },

    openVideoPicker(options, callback) {
        const imageCount = options.videoCount ? options.videoCount : 1
        const optionObj = {
            ...defaultOptions,
            isCamera: false,
            allowPickingGif: false,
            allowPickingVideo: true,
            allowPickingImage: false,
            allowTakeVideo: true,
            allowPickingMultipleVideo: imageCount > 1,
            videoMaximumDuration: 20,
            MaxSecond: 60,
            MinSecond: 0,
            recordVideoSecond: 60,
            ...options,
            imageCount
        };
        return RNPearlImagePicker.openVideoPicker(optionObj, callback)
    }
};
