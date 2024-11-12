document.addEventListener('DOMContentLoaded', function() {
    // 获取所有相关元素
    const photoItems = document.querySelectorAll('.photo-item');
    const photoViewer = document.querySelector('.photo-viewer');
    const viewerImage = document.getElementById('viewer-image');
    const viewerTitle = document.getElementById('viewer-title');
    const viewerDate = document.getElementById('viewer-date');
    const viewerDescription = document.getElementById('viewer-description');
    const closeViewer = document.querySelector('.close-viewer');
    const prevBtn = document.querySelector('.prev-photo');
    const nextBtn = document.querySelector('.next-photo');
    const photoGrid = document.querySelector('.photo-grid');

    let currentPhotoIndex = 0;
    const photos = [...photoItems];

    // 打开照片查看器
    photoItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentPhotoIndex = index;
            updateViewer();
            photoViewer.classList.add('active');
        });
    });

    // 关闭照片查看器
    closeViewer.addEventListener('click', () => {
        photoViewer.classList.remove('active');
    });

    // 上一张/下一张照片
    prevBtn.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        updateViewer();
    });

    nextBtn.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updateViewer();
    });

    // 更新查看器内容
    function updateViewer() {
        const currentItem = photos[currentPhotoIndex];
        const img = currentItem.querySelector('img');
        const info = currentItem.querySelector('.photo-info');
        
        viewerImage.src = img.src;
        viewerImage.alt = img.alt;
        viewerTitle.textContent = info.querySelector('h3').textContent;
        viewerDate.textContent = info.querySelectorAll('p')[0].textContent;
        viewerDescription.textContent = info.querySelectorAll('p')[1].textContent;
    }

    // ESC键关闭查看器
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            photoViewer.classList.remove('active');
        }
    });

    // 模态框相关
    const modal = document.getElementById('addPhotoModal');
    const addBtn = document.getElementById('addPhotoBtn');
    const closeBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const addPhotoForm = document.getElementById('addPhotoForm');

    // 打开模态框
    addBtn.onclick = function() {
        modal.classList.add('active');
        document.getElementById('photoDate').valueAsDate = new Date();
    }

    // 关闭模态框
    function closeModal() {
        modal.classList.remove('active');
        addPhotoForm.reset();
    }

    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;

    // 点击模态框外部关闭
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // 添加本地存储功能
    function savePhotosToLocalStorage() {
        const photoItems = document.querySelectorAll('.photo-item');
        const photos = Array.from(photoItems).map(item => {
            return {
                imgSrc: item.querySelector('img').src,
                title: item.querySelector('h3').textContent,
                date: item.querySelectorAll('p')[0].textContent,
                description: item.querySelectorAll('p')[1].textContent
            };
        });
        localStorage.setItem('savedPhotos', JSON.stringify(photos));
    }

    // 从本地存储加载照片
    function loadPhotosFromLocalStorage() {
        const savedPhotos = localStorage.getItem('savedPhotos');
        if (savedPhotos) {
            const photos = JSON.parse(savedPhotos);
            photos.forEach(photo => {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                photoItem.innerHTML = `
                    <img src="${photo.imgSrc}" alt="${photo.title}">
                    <div class="photo-info">
                        <h3>${photo.title}</h3>
                        <p>${photo.date}</p>
                        <p>${photo.description}</p>
                    </div>
                `;
                photoGrid.insertBefore(photoItem, addBtn);
            });
            bindPhotoViewerEvents();
        }
    }

    // 修改表单提交处理
    addPhotoForm.onsubmit = function(e) {
        e.preventDefault();

        const title = document.getElementById('photoTitle').value;
        const date = document.getElementById('photoDate').value;
        const description = document.getElementById('photoDescription').value;
        const file = document.getElementById('photoFile').files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                
                // 格式化日期
                const formattedDate = date.split('-').join('.');
                
                photoItem.innerHTML = `
                    <img src="${e.target.result}" alt="${title}">
                    <div class="photo-info">
                        <h3>${title}</h3>
                        <p>${formattedDate}</p>
                        <p>${description}</p>
                    </div>
                `;
                
                // 将新照片插入到添加按钮之前
                photoGrid.insertBefore(photoItem, addBtn);
                
                // 保存到本地存储
                savePhotosToLocalStorage();
                
                // 重新绑定照片查看器事件
                bindPhotoViewerEvents();
                
                // 关闭模态框
                closeModal();
            };
            
            reader.readAsDataURL(file);
        }
    };

    // 页面加载时从本地存储加载照片
    loadPhotosFromLocalStorage();

    // 重新绑定照片查看器事件
    function bindPhotoViewerEvents() {
        const photoItems = document.querySelectorAll('.photo-item');
        photos.length = 0; // 清空原有数组
        photos.push(...photoItems); // 更新照片数组
        
        // 重新绑定点击事件
        photoItems.forEach((item, index) => {
            item.onclick = () => {
                currentPhotoIndex = index;
                updateViewer();
                photoViewer.classList.add('active');
            };
        });
    }
}); 