export const initialState = {
  profile: {
    id: null,
    username: null,
    email: null,
    phone: null,
    is_password_changed: null,
    role: {
      name: null,
    },
    name: null,
    image_url: null,
  },
  profileLoading: false,
  profileSuccess: false,
  profileError: false,
  changePasswordLoading: false,
  changePasswordSuccess: false,
  changePasswordError: false,
  updateProfileLoading: false,
  updateProfileSuccess: false,
  updateProfileError: false,
};
