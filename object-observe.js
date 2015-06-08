/**
 * Object Observer
 *
 * The idea behind Object.observe is that we gain the ability to observe and notify applications of changes made to specific JavaScript objects.
 * Such changes include properties being added, updated, removed or reconfigured.


 */

var obj = {};
Object.observe(obj, function (changes) {
  console.log(changes);
});

obj.name = 'Vasa';
// Would log -> [ { type: 'new', object: { name: 'Vasa' }, name: 'name' } ]
