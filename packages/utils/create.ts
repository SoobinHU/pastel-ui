// BEM规范 block 代码块 element 元素 modifier 装饰 state 状态
//p-button  最外层盒子
//p-button__element 元素
//p-button__element--disabled 
//is-checked is-enable

//封装BEM拼接
function _bem(prefixName:string,blockSuffix:string,element:string,modifier:string){
    if(blockSuffix){
        prefixName+=`-${blockSuffix}`
    }
    if(element){
        prefixName+=`__${element}`
    }
    if(modifier){
        prefixName+=`--${modifier}`
    }
    return prefixName
}

function createBEM(prefixName:string){
    const b = (blockSuffix:string = "") => _bem(prefixName,blockSuffix,"","")
    //判断一下以免传空时返回一个block
    const e = (element:string = "") =>element ? _bem(prefixName,"",element,"") : ""
    const m = (modifier:string = "") =>modifier ? _bem(prefixName,"","",modifier) : ""
    const be = (blockSuffix:string = "",element:string = "") => blockSuffix && element ? _bem(prefixName,blockSuffix,element,"") : ""
    const bm = (blockSuffix:string = "",modifier:string = "") => blockSuffix && modifier ? _bem(prefixName,blockSuffix,"",modifier) : ""
    const em = (element:string = "",modifier:string = "") => element && modifier ? _bem(prefixName,"",element,modifier) : ""
    const bem = (blockSuffix:string = "",element:string = "",modifier:string = "") => blockSuffix && element && modifier ? _bem(prefixName,blockSuffix,element,modifier) : ""
    const is = (name:string,state)=>{state ? `is-${name}` : ""}
    return{
        b,
        e,
        m,
        be,
        bm,
        em,
        bem,
        is
    }
}

function createNamespace(name:string){
    //加上前缀名
    const prefixName = `p-${name}`
    return createBEM(prefixName)
}

// const bem = createNamespace('icon')
// console.log(bem.b('box'))
// console.log(bem.e('element'))
// console.log(bem.m('modifier'))
// console.log(bem.bem('box','element','modifier'))