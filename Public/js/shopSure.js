$(function(){
    let myScroll=new IScroll('.wrapper');
    let wineList=$('.winelist>.scroll');
    let chooseList=JSON.parse(localStorage.shop);
    let totalNum=$('.totalNum');
    let totalPrice=$('.totalPrice');
    let itemTotal=$('.itemTotal');
    render(wineList,chooseList);
    myScroll=new IScroll('.winelist');
    function render(obj,data){
        obj.empty();
        let str='';
        for(let i=0;i<data.length;i++){
            str+=`
            <li data='${JSON.stringify(data[i])}' class="list">
                <div class="thumb">
                    <img src="${data[i]['thumb']}" alt="">
                </div>
            <ul class="data">
                <li class="title">
                    <span class="sname">${data[i]['sname']}</span>
                </li>
                <li class="description">
                    <span>${data[i]['description']}</span>
                    <span>${data[i]['capticy']}</span>
                </li>
                <li>
                    <div class="option">
                        <span class="reduce"></span>
                        <span class="count">${data[i]['num']}</span>
                        <span class="plus"></span>
                    </div>
                    <div class="price">
                        <span class="itemTotal">${(data[i]['num']*data[i]['price']).toFixed(2)}</span>
                        <div>
                            <div class="sty">
                                <span></span>
                                <span></span>
                            </div>
                            <span>RMB</span>
                        </div>
                    </div>
                </li>
            </ul>
            </li>
            `;
        }
        obj.html(str);
        totalNum.html(countTotalNum());
        totalPrice.html(countTotalPrice());
    }
    function countTotalNum(){
        let num=0;
        chooseList.forEach(element=>{
            num+=element.num;
        })
        return num;
    }
    function countTotalPrice(){
        let num=0;
        chooseList.forEach(element=>{
            num+=element.price*element.num;
        })
        return num.toFixed(2);
    }
    //////////////////////////////////购物车数量加////////////////////////////////////////
    $('.scroll').on('click','.plus',function(){
        let goods=JSON.parse($(this).closest('.list').attr('data'));
        let v=chooseList.filter(element=>element.sid==goods.sid);
        if(v.length){
            v[0].num++;
            $(this).prev().html(v[0].num++);
        }
        $(this).parent().nextAll('.itemTotal').html((v[0].num*v[0].price).toFixed(2));
        totalNum.text(countTotalNum());
        totalPrice.text(countTotalPrice());
    })
    /////////////////////////////////购物车数量减////////////////////////////////////////
    $('.scroll').on('click','.reduce',function(){
        let goods=JSON.parse($(this).closest('.list').attr('data'));
        //判断有无商品
        let v=chooseList.filter(element=>element.sid == goods.sid);
        if (v.length) {
            //有
            v[0].num--;
            if (!v[0].num) {
                //没有,就移除
                chooseList=chooseList.filter(ele => ele.sid != goods.sid);
                $(this).next('.list').animate({marginLeft:'-100%'}).queue(function () {
                    $(this).closest('.list').remove();
                })
            }
        }
        $(this).parent().nextAll('.itemTotal').html((v[0].num*v[0].price).toFixed(2));
        totalNum.text(countTotalNum());
        totalPrice.text(countTotalPrice());
    })
})