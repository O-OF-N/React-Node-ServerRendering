import React from 'react';
import '../../terra/css/terra.css'
import '../../terra/fonts/terra_icons/terra_icons.eot'
import '../../terra/fonts/terra_icons/terra_icons.svg'
import '../../terra/fonts/terra_icons/terra_icons.ttf'
import '../../terra/img/icon_sprite.png'

const error = () => (
    <div class="alert alert-error" role="alert">
        <p><strong>Error!</strong> Your action was unsuccessful.</p>
    </div>
);

export default error;