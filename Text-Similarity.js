/**
 * @description 计算两个字符串的相似度，基于 Levenshtein 距离算法
 * @param {string} a - 第一个字符串
 * @param {string} b - 第二个字符串
 * @returns {string} 相似度百分比（格式化为字符串，如 "85.32"）
 */
function levenshteinSimilarity (a, b) {
  const m = a.length
  const n = b.length
  const d = []

  // 初始化矩阵
  for (let i = 0; i <= n; i++) d[i] = [i]
  for (let j = 0; j <= m; j++) d[0][j] = j

  // 计算编辑距离
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      d[i][j] = a[j - 1] === b[i - 1]
        ? d[i - 1][j - 1] // 字符匹配，无需编辑
        : Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]) + 1 // 计算最小编辑操作
    }
  }

  // 计算相似度
  const distance = d[n][m]
  const similarity = (1 - (distance / Math.max(m, n))) * 100
  return similarity.toFixed(2)
}
