<style>
.list-container {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s ease;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

.list-item .icon {
  margin-right: 10px;
}

.list-item .text {
  font-weight: bold;
}
</style>

<template>
  <div class="list-container">
    <div
      class="list-item"
      v-for="(item, index) in itemList"
      :key="index"
      @click="selectItem(item)"
    >
      <div class="icon">Icon</div>
      <div class="text">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
