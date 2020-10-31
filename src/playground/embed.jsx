import './import-first';

import ReactDOM from 'react-dom';
import React from 'react';
import {compose} from 'redux';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import TWEmbedFullScreenHOC from '../lib/tw-embed-fullscreen-hoc.jsx';
import TWStateManagerHOC from '../lib/tw-state-manager-hoc.jsx';
import TWFullscreenResizerHOC from '../lib/tw-fullscreen-resizer-hoc.jsx';

import GUI from './render-gui.jsx';
import appTarget from './app-target';

const projectId = location.hash.substr(1);

let vm;

const onVmInit = _vm => {
    vm = _vm;
};

const onProjectLoaded = () => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('autoplay')) {
        vm.start();
        vm.greenFlag();
    }
};

const WrappedGUI = compose(
    AppStateHOC,
    TWStateManagerHOC,
    TWEmbedFullScreenHOC,
    TWFullscreenResizerHOC
)(GUI);

ReactDOM.render(<WrappedGUI
    isEmbedded
    projectId={projectId}
    onVmInit={onVmInit}
    onProjectLoaded={onProjectLoaded}
    routingStyle="hash"
/>, appTarget);
