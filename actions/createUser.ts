interface userObject {
  username: string;
  address: string;
  bio: string;
  dob: string;
  education: string;
  gender: string;
  height: string;
  howyoudie: string;
  intension: IntensionItem[];
  liketodate: string;
  sexuality: string;
  location: Location;
  pronouns: PronounsItem[];
}

interface Location {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface IntensionItem {
  label: string;
  isChecked: boolean;
}

interface PronounsItem {
  label: string;
  isChecked: boolean;
}

export const createUser = async (userObject: userObject) => {
  console.log(userObject);
};
