var coordinates = AFRAME.utils.coordinates;

AFRAME.registerComponent('line', {
  /* Schema defines the shape of the component's data. */
  schema: {
    color: { default: '#000' },
    path: {
      default: [
        { x: -0.5, y: 0, z: 0 },
        { x: 0.5, y: 0, z: 0 }
      ],
      parse: function (value) {
        // Deserialize to comma-separated vec3s: `0 0 0, 1 1 1, 2 0 3`.
        return value.split(',').map(coordinates.parse);
      },
      stringify: function (data) {
        // Serialize array of vec3s if someone does setAttribute('line', 'path', [...]).
        return data.map(coordinates.stringify).join(',');
      }
    }
  },

  /* Called on component attached and whenever component data updates. */
  update: function () {
    // Create a material using the color.
    var material = new THREE.LineBasicMaterial({
      color: this.data.color
    });

    // Create a geometry using the path.
    var geometry = new THREE.Geometry();
    this.data.path.forEach(function (vec3) {
      geometry.vertices.push(
        new THREE.Vector3(vec3.x, vec3.y, vec3.z)
      );
    });

    // Register and add the three.js object as type `mesh` to the entity.
    this.el.setObject3D('mesh', new THREE.Line(geometry, material));
  },

  /* Called on component detached. */
  remove: function () {
    this.el.removeObject3D('mesh');
  }
});
