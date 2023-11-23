import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

type PropsType = {
  children: ReactNode;
};

type ContextProps = {
  currentMusicData: MusicListType;
  setCurrentMusicData: Dispatch<SetStateAction<MusicListType>>;
};

export const UserContext = createContext<ContextProps>({
  currentMusicData: {
    title: '',
    artist: '',
    fontType: '',
    image: '',
  },
  setCurrentMusicData: () => {},
});

const UserProvider = ({ children }: PropsType) => {
  const [currentMusicData, setCurrentMusicData] = useState<MusicListType>({
    title: '',
    artist: '',
    fontType: '',
    image: '',
  });
  return (
    <UserContext.Provider
      value={{
        currentMusicData,
        setCurrentMusicData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
