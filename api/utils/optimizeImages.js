function optimizeImageUrls(imageUrls) {
    return imageUrls.map(url => {
        if (url.includes("f_auto")){
            return url;
        }
        
        const optimizedUrl = url.replace('/upload/', '/upload/f_auto,q_auto,p_jpg/');
        return optimizedUrl;
});
}

module.exports = optimizeImageUrls;
