interface SetRoute {
  newPathname: string;
  isMainRoute: boolean;
}
export const setRoute = ({ newPathname, isMainRoute }: SetRoute) => {
  const state = { ...window.history.state };
  let { href, origin, pathname: prevPathname } = window.location;
  if (newPathname !== prevPathname) {
    if (isMainRoute) {
      href = origin + newPathname;
      state.mainRoute = newPathname;
    }
    window.history.pushState(state, newPathname, href);
  }
  const resultPathname = state.mainRoute || prevPathname;
  return {
    prev: prevPathname,
    current: resultPathname,
  };
}
