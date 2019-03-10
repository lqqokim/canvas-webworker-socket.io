var _PACKET = undefined;

function PACKET( g_worker ){

    // 매칭 될 함수
    var match_funcs = {
        sum: sum
    };

    function on( e ){
        var type = e.data.type;
        var data = e.data.val;
        
        ( match_funcs.hasOwnProperty(type) ) && (
            match_funcs[type]( data )
        );
    }

    function send( type, data ){
        g_worker.postMessage({ type: type, val:data });
    }

    function sum( dataArr ){
        send( 'sum', dataArr[0] + dataArr[1] );
    }

    function init(){
        g_worker.onmessage = on;   
    }
    init();
}

_PACKET = new PACKET( this );