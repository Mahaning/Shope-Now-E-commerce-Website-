const SearchNavBar = () => {
    return (
        <div >
            {/* Navbar */}
            <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme shadow border-0" id="layout-navbar">
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-4" href="">
                        <i className="bx bx-menu bx-sm" />
                    </a>
                </div>
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    {/* Search */}
                    <div className="navbar-nav align-items-center ">
                        <div className="nav-item d-flex align-items-center" style={{ boxShadow: 'rgb(59 55 55 / 35%) 0.5px 2px 10px 1px',width: '100%',borderRadius: '20px' }}>
                            <span className="px-3">
                                <i className="fa fa-search" />
                            </span>
                            <input type="text" className="form-control border-0 shadow-none" placeholder="Search..." aria-label="Search..." style={{ width: "calc(100% - 40px)", backgroundColor: "transparent" }} />
                        </div>
                    </div>
                    {/* /Search */}
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        {/* Place this tag where you want the button to render. */}
                        <li className="nav-item lh-1 me-3">
                            <a className="github-button" href="" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star themeselection/sneat-html-admin-template-free on GitHub">Star</a>
                        </li>
                        {/* User */}
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow" href="" data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    {/* <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" /> */}
                                    <i className='fa fa-user w-px-40 h-auto rounded-circle' />
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    {/* <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" /> */}
                                                    <i className='fa fa-user w-px-40 h-auto rounded-circle' />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <span className="fw-semibold d-block">John Doe</span>
                                                <small className="text-muted">Admin</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bx bx-user me-2" />
                                        <span className="align-middle">My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bx bx-cog me-2" />
                                        <span className="align-middle">Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <span className="d-flex align-items-center align-middle">
                                            <i className="flex-shrink-0 bx bx-credit-card me-2" />
                                            <span className="flex-grow-1 align-middle">Billing</span>
                                            <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="auth-login-basic.html">
                                        <i className="bx bx-power-off me-2" />
                                        <span className="align-middle">Log Out</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        {/*/ User */}
                    </ul>
                </div>
            </nav>
            {/* / Navbar */}
        </div>
    );
}
export default SearchNavBar;
