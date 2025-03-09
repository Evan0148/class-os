/**
 * Class OS 公共样式加载脚本
 * 用于加载导航栏和页脚等公共组件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 创建导航栏
    const header = document.getElementById('header');
    if (header) {
        const nav = document.createElement('nav');
        nav.className = 'fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200';
        nav.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <div class="flex items-center">
                        <span class="text-2xl font-['Pacifico'] text-primary">CO</span>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="index.html" class="text-gray-700 hover:text-primary transition-colors">首页</a>
                        <a href="docs-user.html" class="text-gray-700 hover:text-primary transition-colors">使用文档</a>
                        <a href="download.html" class="text-gray-700 hover:text-primary transition-colors">下载</a>
                        <a href="#" id="nav-community" class="text-gray-700 hover:text-primary transition-colors">社区</a>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button class="p-2 rounded-full hover:bg-gray-100 transition-colors" title="切换主题" id="theme-toggle">
                            <i class="ri-sun-line text-gray-600"></i>
                        </button>
                        <!-- 移动端菜单按钮 -->
                        <button class="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors" title="菜单" id="mobile-menu-button">
                            <i class="ri-menu-line text-gray-600"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- 移动端菜单 -->
            <div class="md:hidden mobile-menu hidden" id="mobile-menu">
                <div class="glass-effect py-2 px-4 mt-1 mx-4 rounded-lg shadow-lg">
                    <a href="index.html" class="block py-2 text-gray-700 hover:text-primary transition-colors">首页</a>
                    <a href="docs-user.html" class="block py-2 text-gray-700 hover:text-primary transition-colors">使用文档</a>
                    <a href="download.html" class="block py-2 text-gray-700 hover:text-primary transition-colors">下载</a>
                    <a href="#" id="nav-community-mobile" class="block py-2 text-gray-700 hover:text-primary transition-colors">社区</a>
                </div>
            </div>
        `;
        header.appendChild(nav);
        
        // 移动端菜单的显示和隐藏
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // 切换图标
                const icon = mobileMenuButton.querySelector('i');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.className = 'ri-menu-line text-gray-600';
                } else {
                    icon.className = 'ri-close-line text-gray-600';
                }
            });
            
            // 点击页面其他区域关闭菜单
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.querySelector('i').className = 'ri-menu-line text-gray-600';
                }
            });
            
            // 点击移动端菜单中的社区链接
            const navCommunityMobile = document.getElementById('nav-community-mobile');
            if (navCommunityMobile) {
                navCommunityMobile.addEventListener('click', function(e) {
                    e.preventDefault();
                    // 关闭移动菜单
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.querySelector('i').className = 'ri-menu-line text-gray-600';
                    
                    // 触发页面底部"加入社区"按钮的点击事件
                    const joinCommunityBtn = document.getElementById('join-community');
                    if (joinCommunityBtn) {
                        joinCommunityBtn.click();
                    }
                });
            }
        }
    }

    // 创建页脚
    const footer = document.getElementById('footer');
    if (footer) {
        footer.className = 'glass-effect mt-16 py-6';
        footer.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 text-center text-gray-600">
                <p>© 2025 Class OS. 你们知道吗？什么不会吧？真的吗？Class OS是Evan开发的✪ ω ✪</p>
            </div>
        `;
    }

    // 主题切换
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // 检查系统偏好
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // 从localStorage获取用户设置，如果没有则使用系统偏好
        let isDark = localStorage.getItem('dark-mode');
        if (isDark === null) {
            isDark = prefersDarkScheme.matches;
            localStorage.setItem('dark-mode', isDark);
        } else {
            isDark = isDark === 'true';
        }
        
        // 页面加载时应用主题
        applyTheme();
        
        // 监听系统主题变化
        prefersDarkScheme.addEventListener('change', (e) => {
            // 只有当用户没有手动设置过主题时，才跟随系统变化
            if (localStorage.getItem('user-theme-preference') !== 'manual') {
                isDark = e.matches;
                localStorage.setItem('dark-mode', isDark);
                applyTheme();
            }
        });
        
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            localStorage.setItem('dark-mode', isDark);
            // 标记用户已手动设置主题偏好
            localStorage.setItem('user-theme-preference', 'manual');
            applyTheme();
        });
        
        function applyTheme() {
            const themeIcon = themeToggle.querySelector('i');
            themeIcon.className = isDark ? 'ri-moon-line text-gray-600' : 'ri-sun-line text-gray-600';
            
            if (isDark) {
                document.body.classList.add('dark-mode');
                document.body.style.background = 'linear-gradient(to bottom right, #111827, #1e293b)';
            } else {
                document.body.classList.remove('dark-mode');
                document.body.style.background = 'linear-gradient(to bottom right, #eff6ff, #ffffff)';
            }
        }
    }
    
    // 导航栏社区链接点击事件
    const navCommunity = document.getElementById('nav-community');
    if (navCommunity) {
        navCommunity.addEventListener('click', function(e) {
            e.preventDefault();
            // 触发页面底部"加入社区"按钮的点击事件
            const joinCommunityBtn = document.getElementById('join-community');
            if (joinCommunityBtn) {
                joinCommunityBtn.click();
            }
        });
    }
}); 