//@ts-ignore
import Plyr from "plyr-react";
import React from "react";
import "plyr-react/dist/plyr.css";

interface Props {
    data: any
    type: string;
    videoUrl: string;
}

export default function VideoPlayer({data, type, videoUrl}:Props) {
    return (
        <div className="video-player">
            {
                type === "Youtube" ? (
                    <Plyr
                        options={{
                            controls: [
                                'rewind',
                                'play',
                                'fast-forward',
                                'progress',
                                'current-time',
                                'duration',
                                'mute',
                                'volume',
                                'settings',
                                'fullscreen',
                                "quality",
                            ],
                            i18n: {
                                restart: 'Restart',
                                rewind: 'Rewind {seektime}s',
                                play: 'Play',
                                pause: 'Pause',
                                fastForward: 'Forward {seektime}s',
                                seek: 'Seek',
                                seekLabel: '{currentTime} of {duration}',
                                played: 'Played',
                                buffered: 'Buffered',
                                currentTime: 'Current time',
                                duration: 'Duration',
                                volume: 'Volume',
                                mute: 'Mute',
                                unmute: 'Unmute',
                                enableCaptions: 'Enable captions',
                                disableCaptions: 'Disable captions',
                                download: 'Download',
                                enterFullscreen: 'Enter fullscreen',
                                exitFullscreen: 'Exit fullscreen',
                                frameTitle: 'Player for {title}',
                                captions: 'Captions',
                                settings: 'Settings',
                                menuBack: 'Go back to previous menu',
                                speed: 'Speed',
                                normal: 'Normal',
                                quality: 'Quality',
                                loop: 'Loop',
                            }

                        }}
                        source={{
                            type: "video",
                            sources: [
                                {
                                    src: videoUrl,
                                    provider: "youtube",
                                },
                            ],
                        }}
                    />
                ) : (
                    <Plyr
                        source={{
                            type: "video",
                            sources: [
                                {
                                        src: `https://backend.eduon.uz${videoUrl}`,
                                    provider: "html5",
                                },
                            ],
                        }}
                    />
                )
            }
        </div>
    )
}