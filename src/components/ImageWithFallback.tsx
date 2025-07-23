import React, { useState } from 'react';
import { Image, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native';

interface Props {
    uri?: string;
    fallback: ImageSourcePropType;
    style?: StyleProp<ImageStyle>;
}

const ImageWithFallback: React.FC<Props> = ({ uri, fallback, style }) => {
    const [hasError, setHasError] = useState(false);

    const source = !uri || hasError ? fallback : { uri };

    return (
        <Image
            source={source}
            style={style}
            onError={() => setHasError(true)}
        />
    );
};

export default ImageWithFallback;
