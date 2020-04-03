import {ProfileProps} from "/imports/ui/Settings/Profile";

export function getFacebookProfile(profile: FaceBookProfile): ProfileProps {
    return {
        name: profile.name,
        pictureUrl: profile.picture?.data.url
    };
}
export function getGoogleProfile(profile: GoogleProfile): ProfileProps {
    return {
        name: profile.name,
        pictureUrl: profile.picture
    };
}
export function getTwitterProfile(profile: TwitterProfile): ProfileProps {
    return {
        name: profile.screenName,
        pictureUrl: profile.profile_image_url_https ?? profile.profile_image_url
    };
}


interface FaceBookProfile {
    accessToken: string,
    expiresAt: number,
    id: string,
    email: string,
    name: string,
    first_name: string,
    last_name: string,
    name_format: string,
    picture?: {
        data: {
            height: number,
            is_silhouette: boolean,
            url: string,
            width: number
        }
    },
    short_name: string

}
interface GoogleProfile {
    accessToken: string,
    idToken: string,
    scope: string[],
    expiresAt: number,
    id: string,
    email: string,
    verified_email: true,
    name: string,
    given_name: string,
    family_name: string,
    picture: string,
    locale: string
}
interface TwitterProfile {
    id: string,
    screenName: string,
    accessToken: string,
    accessTokenSecret: string,
    profile_image_url: string,
    profile_image_url_https: string,
}
