export const userView = (user) => {
  user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    gender: user.gender,
    picture: user.picture,
    phone: user.phone,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
  return user;
};

export const userTokenView = (user) => {
  user = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  return user;
};
