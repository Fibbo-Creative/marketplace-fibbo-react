# MARKETPLACE NFT FIBBO
    <div className="h-10 h-auto pt-32" >
      <div className="flex w-auto h-auto justify-center p-0 items-center justify-center">
        <form className="flex flex-col gap-5 p-3 w-fit ">
          <div className="flex gap-3">
            <label htmlFor="imageInput">Nft image</label>
            <input
              type="file"
              onChange={(e) => onFileSelected(e)}
              className="border border-gray-300"
              id="imageInput"
            />
          </div>
          <div className="flex gap-3 justify-between">
            <label htmlFor="imageInput">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300"
              id="imageInput"
              type="text"
            />
          </div>
          <div className="flex gap-3 justify-between">
            <label htmlFor="imageInput">Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border border-gray-300"
              id="imageInput"
              type="text"
            />
          </div>
          <div className="flex gap-3 justify-between">
            <label htmlFor="imageInput">Royalty</label>
            <input
              value={royalty}
              onChange={(e) => setRoyalty(e.target.value)}
              className="border border-gray-300"
              id="imageInput"
              type="text"
            />
          </div>
          <button onClick={(e) => createNFT(e)} type="submit">
            Create NFT
          </button>
        </form>
      </div>
    </div>