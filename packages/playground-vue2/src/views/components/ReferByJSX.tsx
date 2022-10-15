import ByDefineComponent from './ByDefineComponent';
import BySPA from './BySPA.vue';
import ByDeclareComponent from './ByDeclareComponent';
import { defineComponent, ref } from 'vue';

const instanceRef = ref();

export default defineComponent({
  render() {
    const handleOk = () => {
      console.log('ok');
    };
    return (
      <div>
        <wkc-header class="hello" style={{ color: 'red' }}>
          world
        </wkc-header>
        <ByDefineComponent ref={instanceRef} foo onOk={handleOk} />
        <BySPA ref={instanceRef} color="hello" onChange={handleOk} />
        <ByDeclareComponent ref={instanceRef} foo="x" onOk={handleOk} />
      </div>
    );
  },
});
