export function getList() {
    return fetch('http://eticket.hueworldheritage.org.vn/api/diadiem')
      .then(data => data.json())
  }
  export function getList1() {
    return fetch('https://www.hueworldheritage.org.vn/desktopModules/APITinBai/API/v1/News/getListNewsbyCateID?categoryId=4D90F3A4-6380-4C84-A4DF-AE6800B5A5E5')
      .then(data => data.json())
  }
  export function getListNoiQuy() {
    return fetch('https://www.hueworldheritage.org.vn/desktopModules/APITinBai/API/v1/News/getListNewsbyCateID?categoryId=EBB95271-FEDD-4FC3-874B-AE6A00AE66EC')
      .then(data => data.json())
  }
