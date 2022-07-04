export function getList() {
    return fetch('http://eticket.hueworldheritage.org.vn/api/diadiem')
      .then(data => data.json())
  }