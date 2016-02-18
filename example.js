var setCountDown = function (){
    // 最初－》预约结束
    CountDownList.addCounterNode({
        end : endTime - 1e3, // 结束时间
        base : serverNow, // 基准时间，用于调整为服务器时间，一般是服务器的时间戳
        first : function (){
            $(".countdown_hintbox").show();
            $(".hint-btn").show();
            $(".rush-btn").hide();
            $(".sell-out-btn").hide();
            $(".pre-rush-btn").hide();
        },
        every : function (data){
            var time = buyStartTime;
            var nowTime = +new Date() - startTime + serverNow;
            var delta = times.buyStartTime - nowTime;
            var timeInfo = CountDownList.getDHMSByDelta(delta);

            var timeStr = "<em>" + timeInfo[0] + "</em>天<em>" + timeInfo[1] + "</em>时<em>" + timeInfo[2] + "</em>分<em>" +timeInfo[3] + "</em>秒";
            setTimeStr(".time_remain", timeStr);
        }         
    });

    // 预约结束->抢购开始
    CountDownList.addCounterNode({
        begin : yuyueEndTime + 1e3,
        end : times.buyStartTime, // 结束时间
        base : serverNow, // 基准时间，用于调整为服务器时间，一般是服务器的时间戳
        first : function (){
            $(".countdown_hintbox").hide();
            $(".hint-btn").hide();
            $(".rush-btn").hide();
            $(".sell-out-btn").hide();

            $(".pre-rush-btn").show();
        },
        every : function (data){
            var delta = data.delta2;
            var timeInfo = CountDownList.getDHMSByDelta(delta);

            var timeStr = timeInfo[0] + "天" + timeInfo[1] + "时" + timeInfo[2] + "分" +timeInfo[3] + "秒";
            setTimeStr(".time_remain", timeStr);
        }         
    });

    // 抢购开始->抢购结束
    CountDownList.addCounterNode({
        begin : buyStartTime,
        end :buyEndTime, // 结束时间
        base : serverNow, // 基准时间，用于调整为服务器时间，一般是服务器的时间戳
        first : function (){
            if ($("#__rush_left__").val() == 0){
                hideAllButSellOut();
                return ;
            }
            $(".countdown_hintbox").hide();
            $(".hint-btn").hide();
            $(".rush-btn").show();
            $(".sell-out-btn").hide();
            $(".pre-rush-btn").hide();
        },
        finish : function (){
            if ($("#__rush_left__").val() == 0){
                hideAllButSellOut();
                return ;
            }
            $(".rush-btn").hide();
            $(".sell-out-btn").show();
        }         
    });  

    // 抢购结束
    CountDownList.addCounterNode({
        begin : buyEndTime,
        end : buyEndTime, // 结束时间
        base : serverNow, // 基准时间，用于调整为服务器时间，一般是服务器的时间戳
        first : function (){
            $(".sell-out-btn").show();
        }       
    });   

    CountDownList.run();
};
