var nationalDay = {
    API:{
        ajax:{
            url:'/ajax/aj_activity160918.php'
        }
    },
    _initDom:{
        $ruleBtn:$('.rule_btn'),
        $startBtn:$('.start_btn'),
        $onlyThree : $('.only-three'),
        $coupons: $('.coupons'),
        $rules:$('.rules'),
        $fail:$('.fail'),
        $close: $('.close'),


        arr : [0, -1.23, -2.46],
        rotateH: -3.69,
        flag:true

    },
    _init:function () {
        this._bind()
    },
    _bind:function () {
        var _this = this;
        _this._initDom.$ruleBtn.on('click',function () {
            _this._initDom.$rules.css('display','-webkit-box')
        });
        _this._initDom.$close.on('click',function () {
            $(this).closest('.pop-warp').hide();
        });
        _this._initDom.$startBtn.on('click',function () {
            var flag = _this._initDom.flag;
            if (flag) {
                _this._initDom.flag = false;
                $.ajax({
                    url:'mock.json'
                }).done(function (data) {
                    _this.letGo(data);
                    _this._initDom.flag = true;
                })
            }
        });
    },
    //转动并且显示结果
    letGo:function (data) {
        var _this = this;
        var code = data.code;
        var result = data.result;
        var obj = {};
        if (code == -401) {
            window.location.href = result.url;
        } else {
            if (code == -404 && data.playNum > 3) {
                $('.only-three').css('display', '-webkit-box');
            } else {
                _this.reset();
                if (code == 200) {
                    var RandomNum = _this.getRandomNum(_this._initDom.arr);
                    obj = {num1:RandomNum,num2:RandomNum,num3 :RandomNum};
                    _this.animateTo(obj);
                    setTimeout(function () {
                        $('.coupons').css('display', '-webkit-box');
                        $('.coupons .txt').text(result.price);
                    }, 4000);
                } else {
                    obj = _this.getFailNum();
                    _this.animateTo(obj);
                    setTimeout(function () {
                        $('.fail').css('display', '-webkit-box');
                    }, 4000);
                }
            }
        }
    },
    //重置位置
    reset:function () {
        var rotateHArr = this._initDom.arr;
        $(".wrap-num1").css("top", rotateHArr[0]+'rem');
        $(".wrap-num2").css("top", rotateHArr[1]+'rem');
        $(".wrap-num3").css("top", rotateHArr[2]+'rem')
    },
    //获得随机的位置
    getRandomNum:function (arr) {
        var num;
        TextNum = parseInt(Math.random() * arr.length);//随机数
        num = arr[TextNum];//在这里随机
        return num
    },
    //动画转动位置
    animateTo:function animateTo(obj) {
        var _this = this;
        var rotateHArr = _this._initDom.arr;
        var rotateH = _this._initDom.rotateH;
        var num1H = rotateH + rotateHArr[1];
        var num2H = rotateH + rotateHArr[2];

        $(".wrap-num1").animate({"top": rotateH+'rem'}, 500, "linear", function () {
            $(this).css("top", 0).animate({"top":rotateH+'rem'}, 500, "linear", function () {
                $(this).css("top", 0).animate({"top": (obj.num1 + rotateH) + "rem"}, 800, "linear");
            })

        });
        $(".wrap-num2").animate({"top": rotateH + rotateHArr[1]+'rem'}, 500, "linear", function () {
            $(this).css("top", rotateHArr[1]+'rem').animate({"top": num1H+'rem'}, 500, "linear", function () {
                $(this).css("top", rotateHArr[1]+'rem').animate({"top": num1H+'rem'}, 800, "linear", function () {
                    $(this).css("top", rotateHArr[1]+'rem').animate({"top": (obj.num2 + rotateH) + "rem"}, 800, "linear");
                })
            })
        });
        $(".wrap-num3").animate({"top": rotateH + rotateHArr[2]+'rem'}, 500, "linear", function () {
            $(this).css("top",rotateHArr[2]+'rem').animate({"top": num2H+'rem'}, 500, "linear", function () {
                $(this).css("top", rotateHArr[2]+'rem').animate({"top": num2H+'rem'}, 500, "linear", function () {
                    $(this).css("top", rotateHArr[2]+'rem').animate({"top": num2H+'rem'}, 800, "linear", function () {
                        $(this).css("top",rotateHArr[2]+'rem').animate({"top": (obj.num3 + rotateH) + "rem"}, 800, "linear");
                    })
                })
            })
        });
    },
    //获得失败数据
    getFailNum:function () {
        var obj = {};
        var _this = this;
        obj.num1 = _this.getRandomNum(_this._initDom.arr);
        obj.num2 = _this.getRandomNum(_this._initDom.arr);
        obj.num3 = _this.getRandomNum(_this._initDom.arr);
        if (obj.num1 == obj.num2 && obj.num1 == obj.num3){
            _this.getFailNum()
        }
        return  obj;
    }
};
nationalDay._init();