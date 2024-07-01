import slugify from 'react-slugify'
import AVATAR_DEFAULT from '../../images/avatar-default.jpg'
import config from '../../configs/Configs.json'

const {
 IMAGE_POST_PLACEHOLDER,
 IMAGE_PROFILE_PLACEHOLDER,
 IMAGE_GROUP_PLACEHOLDER,
 IMAGE_SLIDE_GROUP_PLACEHOLDER,
} = config

export const slugString = (string) => slugify(string)

export const handleErrorImg = (element) => {
 element.src = `${AVATAR_DEFAULT}`
}

export const handleErrorImgPost = (element) => {
 element.src = `${IMAGE_POST_PLACEHOLDER}`
}

export const handleErrorImgProfile = (element) => {
 element.src = `${IMAGE_PROFILE_PLACEHOLDER}`
}

export const handleErrorImgGroup = (element) => {
 element.src = `${IMAGE_GROUP_PLACEHOLDER}`
}

export const handleErrorImgSlideGroup = (element) => {
 element.src = `${IMAGE_SLIDE_GROUP_PLACEHOLDER}`
}
