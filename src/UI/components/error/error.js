import React from 'react';
import '../../terra/vendor/jquery/jquery-2.2.0.min'
import '../../terra/css/terra.css'
import '../../terra/fonts/terra_icons/terra_icons.eot'
import '../../terra/fonts/terra_icons/terra_icons.svg'
import '../../terra/fonts/terra_icons/terra_icons.ttf'
import '../../terra/img/icon_sprite.png'
import '../../terra/js/terra'

const error = () => (
    <div class="alert alert-error" role="alert">
        <p><strong>Error!</strong> Your action was unsuccessful.</p>
    </div>
);

export default error;