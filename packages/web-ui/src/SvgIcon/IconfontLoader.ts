class IconfontLoader {
  private static elementId = 'iconfont-script';
  private depsLoaded?: boolean;
  private depsLoading?: boolean;

  public loadIconfont(url: string) {
    if (this.shouldLoadFont()) {
      this.depsLoading = true;
      const scriptElement = document.createElement('script');
      scriptElement.src = url;
      scriptElement.id = IconfontLoader.elementId;
      scriptElement.onload = () => {
        this.depsLoading = false;
        this.depsLoaded = true;
      };
      document.body.appendChild(scriptElement);
    }
  }

  public shouldLoadFont() {
    if (this.depsLoaded === undefined || this.depsLoading === undefined) {
      this.depsLoaded = document.getElementById(IconfontLoader.elementId) != undefined;
      this.depsLoading = false;
    }
    return !(this.depsLoaded || this.depsLoading);
  }
}
export default IconfontLoader;
