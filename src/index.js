
class TonUniNavigate {
  
  static TAB = 'tab';

  static OPEN = 'open';

  static MINI = 'mini';

  static TO = 'to';

 constructor(pages=[]){
    this.pages = pages;
 }

 to(path,pathArgs={},settings={}){
  if(!path)
  {
    this._error('跳转的页面地址不存在!',-1);
    return;
  }
  let args = this._normalization(path);
  args = this._getPath(args);
  let target = args?.meta?.target||TonUniNavigate.TO;
  if(!args.path)
  {
    this._error('跳转的页面地址不存在',-2);
    return;
  }
  args.url = `${args.path}?${this._httpBuildQuery(pathArgs)}`;
  console.info('跳转地址=>',args);
  this._link(args,target);
 }

/**
 * 归一化 
 * @param {*} args 
 * @returns 
 */
 _normalization(args){
  const page = {
    name:null,
    path:null,
    meta:{
      target:null
    },
    ...(typeof args === 'string'?{
      name:args
    }:args)
  }  
  if(args?.target)
  {
    page.meta.target = args.target;
  }
  return page;
 }

 /**
  * 
  * @param {*} args 
  */
 _getPath(page={}){
    if(!this.pages || this.pages.length<1)
    {
      return page;
    }
    const find = this._find(page);
    if(!find)
    {
      return page;
    }
    const merge =  {
      ...page,
      ...find
    }
    if(page?.meta?.target)
    {
      merge.meta.target = page.meta.target;
    }
    return merge;
 }
/**
 * 搜索对应的页面元素信息
 * @param {*} page 
 * @returns 
 */
 _find(page={})
 {
    let find = null;
    for(const ele of this.pages)
    {
        if(page?.name && ele.name === page?.name)
        {
          find = ele;
          break;
        }
        if(page?.path && String(ele.path).toLocaleLowerCase().indexOf((page?.path||'').toLocaleLowerCase())!=-1)
        {
          find = ele;
          break;
        }
    }
    return find;
 }

 _httpBuildQuery(obj) {
	return (Object.keys(obj)
		.map(key =>
			encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
		)
		.join('&')).toString();
}

 _link(args={},target=TonUniNavigate.TO){
    switch(target)
    {
      case TonUniNavigate.TAB:
        uni.switchTab(args)
        break;
      case TonUniNavigate.OPEN:
        uni.redirectTo(args);
        break;
      case TonUniNavigate.MINI:
        uni.navigateToMiniProgram(args);
        break;
      case TonUniNavigate.TO:
      default:
      uni.navigateTo(args);
      break;
    }
 }
 /**
  * 
  * @param {*} msg 
  * @param {*} code 
  */
 _error(msg,code=-1){
    uni.showToast({
      title: msg||"跳转失败!",
      icon: 'none',
      mask: true
    })
 }
}


export default TonUniNavigate;