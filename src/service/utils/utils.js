import slugify from 'react-slugify'
import AVATAR_DEFAULT from '../../images/avatar-default.jpg'
import config from '../../configs/Configs.json'

const { IMAGE_POST_PLACEHOLDER, IMAGE_PROFILE_PLACEHOLDER } = config

export const slugString = (string) => slugify(string)

export const handleErrorImg = (imgRef) => {
 imgRef.current.src = `${AVATAR_DEFAULT}`
}

export const handleErrorImgPost = (imgRef) => {
 imgRef.current.src = `${IMAGE_POST_PLACEHOLDER}`
}

export const handleErrorImgProfile = (imgRef) => {
 imgRef.current.src = `${IMAGE_PROFILE_PLACEHOLDER}`
}
