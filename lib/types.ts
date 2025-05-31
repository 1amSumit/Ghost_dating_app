export interface userObject {
  email: string;
  user_details: {
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
    bio: string;
    date_of_birth: string;
    education: string;
    gender: string;
    height: string;
    howyoudie: string;
    intension: IntensionItem[];
    interested_in_gender: string;
    sexuality: string;
    location: Location;
    pronouns: PronounsItem[];
  };
  preferences: {
    id: string;
    intensions: string[];
    prefered_min_age: number;
    prefered_max_age: number;
    max_distance: number;
    show_on_feed: boolean;
    is_ghost_mode: boolean;
    verified: boolean;
    user_id: string;
  };
}

export interface Location {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface IntensionItem {
  label: string;
  isChecked: boolean;
}

export interface PronounsItem {
  label: string;
  isChecked: boolean;
}
