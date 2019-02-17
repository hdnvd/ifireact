import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import  { PlayButton, Progress } from 'react-soundplayer/components';
class ProgressSoundPlayer extends Component {
    render() {
        const { track, currentTime, duration } = this.props;

        return (
            <div className="p2 border navy mt1 mb3 flex flex-center rounded voiceplayer">
                <div className="flex-auto"><PlayButton className="flex-none h4 mr2 button white btn-big button-outline button-grow bg-orange circle playbutton sb-soundplayer-btn" {...this.props} /></div>
                <div className="flex-auto sb-soundplayer-progress-container">
                    <div className='flex flex-center'>
                        <Progress
                            className="mt1 mb1 rounded playprogress"
                            innerClassName="rounded-left"
                            value={(currentTime / duration) * 100 || 0}
                            {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

ProgressSoundPlayer.propTypes = {
    resolveUrl: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired
};

export default withSoundCloudAudio(ProgressSoundPlayer);
