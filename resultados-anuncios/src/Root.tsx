import {Composition} from 'remotion';
import {ResultadosVideo} from './ResultadosVideo';

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="ResultadosVideo"
        component={ResultadosVideo}
        durationInFrames={450}
        fps={30}
        width={3840}
        height={2160}
      />
    </>
  );
};
